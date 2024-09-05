import { Block, Button } from "framework7-react";
import { useEffect } from "react";
import { useAccount } from "../hooks/getAccount";
import { List } from "@/components/ui/list";
import { FormListInputField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDialog } from "@/hooks/useDialog";
import { useSaveAccount } from "../hooks/useSaveAccount";
import { account } from "@/lib/API/appwrite/appwrite";
import { useRouter } from "@/hooks/useRouter";



export type AccountFormProps = {
  accountId?: string;
};

export const accountInputSchema = z.object({
  accountType: z.string().optional(),
  initialBalance: z.number().optional(),
  accountName: z.string().min(1, "Account Name is required"),
  users:z.string().optional()
});

export type AccountFormInput = z.infer<typeof accountInputSchema>;

export const AccountForm = ({ accountId }: AccountFormProps) => {
  const dialog = useDialog();
  const router = useRouter();
  const { data: budgetAccount, isLoading } = useAccount({
    accountId: accountId || "0",
  });

  const form = useForm<AccountFormInput>({
    mode: "onBlur",
    resolver: zodResolver(accountInputSchema),
  });

  const { mutate: createAccount, isPending } = useSaveAccount({
    mutationConfig: {
      onSuccess: () => {
        dialog.close();
        dialog.alert("Successfully saved as draft");
        router.navigate("/dashboard/");
      },
      onError: (error: any) => {
        console.error('Error creating account:', error);
        dialog.close(); 
      }
    }
  });

  useEffect(() => {
    if (budgetAccount) {
      const requestValues: AccountFormInput = {
        accountName: budgetAccount.accountName || "",
        accountType: budgetAccount.accountType || "",
        initialBalance: budgetAccount.initialBalance || 0,
      };
      console.log(requestValues);
      form.reset(requestValues);
    }
  }, [budgetAccount, form]);

  if (isLoading) {
    return <Block>Loading...</Block>;
  }

  const submit = async (values: AccountFormInput) => {
    console.log(values)
    dialog.preloader("Submitting Account").open();
   // const currentUser= await account.get();
   
    createAccount(values);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <List dividersIos={true} strongIos={true} strongMd={true} outlineIos={true}>
        <FormListInputField
          control={form.control}
          name="accountName"
          label="Account Name"
          placeholder="Enter Account Name"
        />
        <FormListInputField
          control={form.control}
          name="initialBalance"
          label="Amount"
          valueAs="number"
          placeholder="Enter Amount"
        />
        <FormListInputField
          control={form.control}
          name="accountType"
          label="Account Type"
          placeholder="Enter Account Type"
        />
      </List>
      <Button fill large type="submit" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
};
