import { Block, Button } from "framework7-react";
import { useEffect } from "react";
import { useAccount } from "../hooks/getAccount";
import { List } from "@/components/ui/list";
import { FormListInputField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDialog } from "@/hooks/useDialog";
import { useDeleteAccount, useSaveAccount } from "../hooks/useSaveAccount";
import { account } from "@/lib/API/appwrite/appwrite";
import { useRouter } from "@/hooks/useRouter";





export type AccountFormProps = {
  accountId?: string;
};

export const accountInputSchema = z.object({
  AccountType: z.string().optional(),
  InitialBalance: z.number().optional(),
  AccountName: z.string().min(1, "Account Name is required"),
  users:z.string().optional()
});

export type AccountFormInput = z.infer<typeof accountInputSchema>;

export const AccountForm = ({ accountId }: AccountFormProps) => {
  const dialog = useDialog();
  const router = useRouter();
  const { data: budgetAccount,refetch ,isLoading } = useAccount({
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
        dialog.alert("Successfully saved");
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
        AccountName: budgetAccount.AccountName || "",
        AccountType: budgetAccount.AccountType || "",
        InitialBalance: budgetAccount.InitialBalance || 0,
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
   
    createAccount({account:values,id:accountId});
  };
 


  return (
    <>
    <form onSubmit={form.handleSubmit(submit)}>
      <List dividersIos={true} strongIos={true} strongMd={true} outlineIos={true}>
        <FormListInputField
          control={form.control}
          name="AccountName"
          label="Account Name"
          placeholder="Enter Account Name"
        />
        <FormListInputField
          control={form.control}
          name="InitialBalance"
          label="Amount"
          valueAs="number"
          placeholder="Enter Amount"
        />
        <FormListInputField
          control={form.control}
          name="AccountType"
          label="Account Type"
          placeholder="Enter Account Type"
        />
      </List>
      <Block>
      <Button fill large type="submit" disabled={isPending} className="bg-indigo-500">
        Submit
      </Button>
      </Block>
     { accountId &&   <DeleteComponent accountId={accountId}></DeleteComponent>}

    </form>
 
       

    </>
  );
};

 const DeleteComponent =(props:any)=>{
  const dialog = useDialog();
  const router = useRouter();
  const updateRequestMutation = useDeleteAccount({
    mutationConfig: {
      onSuccess: () => {
        dialog.close();
        dialog.alert("Successfully Deleted");
        router.navigate("/dashboard/");
      },
      onError: (error) => {
        dialog.close();
        dialog.alert("Error saving!!!");
      },
    },
  });
  const handleDelete = (accountId: string) => {
    debugger
    if (confirm('Are you sure you want to delete this account?')) {
      updateRequestMutation.mutate(accountId);
    }
  };

  return  <Block><Button
  fill
  large
  type="button"
   color="red"
  onClick={() => props.accountId && handleDelete(props.accountId)}
>
  Delete
</Button>
</Block>
 }