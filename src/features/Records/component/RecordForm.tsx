import { Block, Button, Tabs, Tab, Link, Toolbar } from "framework7-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDialog } from "@/hooks/useDialog";
import { useRouter } from "@/hooks/useRouter";

import {  useDeleteTranscation, useSaveTransaction } from "../hooks/useSaveTransaction";
import { useCategories } from "@/features/category/hooks/UseCategory";
import { useAccounts } from "@/features/account/hooks/getAccounts";
import { formatDate } from "@/lib/utils";
import { Account } from "@/features/account/type";
import { Category } from "@/features/category/types";
import { List } from "@/components/ui/list";
import { FormListInputField } from "@/components/ui/form";
import { useTrasaction } from "../hooks/useTransaction";
import { useAccountStore } from "@/features/account/hooks/accountStore";

export type TransactionFormProps = {
  transactionId?: string;
};

const transactionInputSchema = z.object({
  transactionDate: z.string(),
  description: z.string().optional(),
  amount: z.number().optional(),
  categories: z.string(),
  accounts: z.string(),
});

export type TransactionFormInput = z.infer<typeof transactionInputSchema>;

export const RecordForm = ({ transactionId }: TransactionFormProps) => {
  const dialog = useDialog();
  const router = useRouter();

  const { selectedAccountId } = useAccountStore();
  const { data: transcationData, isLoading } = useTrasaction({
    transactionId: transactionId,
  });

  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  const [isIncomeTab, setIsIncomeTab] = useState(true);

  const form = useForm<TransactionFormInput>({
    mode: "onBlur",
    resolver: zodResolver(transactionInputSchema),
    defaultValues: {
      accounts: selectedAccountId || "",  
    },
  });
  const { mutate: saveTransaction, isPending } = useSaveTransaction({
    mutationConfig: {
      onSuccess: () => {
        dialog.close();
        dialog.alert("Successfully saved");
        router.navigate("/dashboard/");
      },
      onError: (error: any) => {
        console.error("Error creating transaction:", error);
        dialog.close();
      },
    },
  });

  useEffect(() => {
    if (transcationData) {
      form.reset({
        transactionDate: formatDate(transcationData.transactionDate),
        description: transcationData.description,
        amount: transcationData.amount || 0,
        categories: transcationData.categories?.$id,
        accounts: transcationData.accounts?.$id,
      });
  
      setIsIncomeTab(transcationData.isIncome);
    }
  }, [transcationData, form]);
  

  const handleSubmit = async (values: TransactionFormInput) => {
    dialog.preloader("Submitting Record").open();
    saveTransaction({
      transcation: { ...values, isIncome: isIncomeTab } as TransactionFormInput & { isIncome: boolean },
      id: transactionId,
    });
  };

  if (isLoading) {
    return <Block>Loading...</Block>;
  }

  return (
    <>
      <TransactionToolbar isIncomeTab={isIncomeTab} setIsIncomeTab={setIsIncomeTab} />
      <Tabs>
        <TransactionTab
          form={form}
          accounts={accounts}
          categories={categories}
          onSubmit={form.handleSubmit(handleSubmit)}
          isPending={isPending}
          transactionId={transactionId}
        />
      </Tabs>
    </>
  );
};

type TransactionTabProps = {
  form: ReturnType<typeof useForm<TransactionFormInput>>;
  accounts: Account[] | undefined;
  categories: Category[] | undefined;
  onSubmit: () => void;
  isPending: boolean;
  transactionId?: string;
};

const TransactionTab = ({ form, accounts, categories, onSubmit, isPending, transactionId }: TransactionTabProps) => (
  <Tab tabActive>
    <form onSubmit={onSubmit}>
      <TransactionFormFields form={form} accounts={accounts} categories={categories} />
      <Block>
        <Button fill large type="submit" disabled={isPending} className="bg-indigo-500">
          Submit
        </Button>
      </Block>
      {transactionId && <DeleteComponent transactionId={transactionId} />}
    </form>
  </Tab>
);

type TransactionFormFieldsProps = {
  form: ReturnType<typeof useForm<TransactionFormInput>>;
  accounts: Account[] | undefined;
  categories: Category[] | undefined;
};

const TransactionFormFields = ({ form, accounts, categories }: TransactionFormFieldsProps) => (
  <><List >
    <FormListInputField
      control={form.control}
      name="amount"
      label=""
   
      valueAs="number"
    />
  </List>
  <List strongMd={true} >
    
    <FormListInputField
      control={form.control}
      name="description"
      label="Description"
      placeholder="Enter description"
    />
    <FormListInputField
      name="accounts"
      control={form.control}
      label="Account"
      type="select"
      placeholder="Select account"
    >
      <option>Select Account</option>
      {accounts?.map((account: Account) => (
        <option key={account.$id} value={account.$id!}>
          {account.AccountName}
        </option>
      ))}
    </FormListInputField>
    <FormListInputField
      name="categories"
      control={form.control}
      label="Category"
      type="select"
      placeholder="Select category"
    >
      <option>Select Category</option>
      {categories?.map((category: Category) => (
        <option key={category.$id} value={category.$id}>
          {category.categoryname}
        </option>
      ))}
    </FormListInputField>
    <FormListInputField
      name="transactionDate"
      control={form.control}
      label="Transaction Date"
      type="datepicker"
      placeholder="DD-MM-YYYY"
      calendarParams={{
        dateFormat: { weekday: "long", month: "long", day: "2-digit", year: "numeric" },
      }}
    />
  </List>
  </>
);


type TransactionToolbarProps = {
  isIncomeTab: boolean;
  setIsIncomeTab: (value: boolean) => void;
};

const TransactionToolbar = ({ isIncomeTab, setIsIncomeTab }: TransactionToolbarProps) => (
  <Toolbar bottom tabbar>
    <Link tabLink="#income-tab" tabLinkActive={isIncomeTab} onClick={() => setIsIncomeTab(true)}>
      Income
    </Link>
    <Link tabLink="#expense-tab" tabLinkActive={!isIncomeTab} onClick={() => setIsIncomeTab(false)}>
      Expenses
    </Link>
  </Toolbar>
);

type DeleteComponentProps = {
  transactionId: string;
};

const DeleteComponent = ({ transactionId }: DeleteComponentProps) => {
  const dialog = useDialog();
  const router = useRouter();
  const { mutate: deleteTransaction } = useDeleteTranscation({
    mutationConfig: {
      onSuccess: () => {
        dialog.close();
        dialog.alert("Successfully Deleted");
        router.navigate("/records/list/");
      },
      onError: () => {
        dialog.close();
        dialog.alert("Error deleting transaction");
      },
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(transactionId);
    }
  };

  return (
    <Block>
      <Button fill large type="button" color="red" onClick={handleDelete} className="bg-red-500">
        Delete
      </Button>
    </Block>
  );
};
