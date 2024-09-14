import { Block, Button } from "framework7-react";
import { useEffect, useTransition } from "react";
import { useAccount } from "../../account/hooks/getAccount";
import { List } from "@/components/ui/list";
import { FormListInputField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDialog } from "@/hooks/useDialog";
import { useDeleteAccount, useSaveAccount } from "../../account/hooks/useSaveAccount";
import { account } from "@/lib/API/appwrite/appwrite";
import { useRouter } from "@/hooks/useRouter";
import { useTrasaction } from "../hooks/useTransaction";
import { useSaveTransaction } from "../hooks/useSaveTransaction";


// categoryId:string,
// transactionDate: string;
// description:string;
// amount:number;
// isIncome:boolean;


export type TransactionFormProps = {
  transcationId?: string;
};

export const transactionInputSchema = z.object({
  transactionDate: z.string(),
  description: z.string().optional(),
  amount: z.number().optional(),
  isIncome: z.boolean().optional()
});

export type TransactionFormInput = z.infer<typeof transactionInputSchema>;

export const RecordForm = ({ transcationId: transcationId }: TransactionFormProps) => {
  const dialog = useDialog();
  const router = useRouter();
  const { data: transcationData,isLoading } = useTrasaction({
    transactionId: transcationId || "0",
  });

  const form = useForm<TransactionFormInput>({
    mode: "onBlur",
    resolver: zodResolver(transactionInputSchema),
  });

  const { mutate: createTransaction, isPending } = useSaveTransaction({
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
    if (transcationData) {
      const requestValues: TransactionFormInput = {
        transactionDate: transcationData.transactionDate ,
        description: transcationData.description ,
        amount: transcationData.amount || 0,
        isIncome:transcationData.isIncome
      };
      
      console.log(requestValues);
      form.reset(requestValues);
    }
  }, [transcationData, form]);

  if (isLoading) {
    return <Block>Loading...</Block>;
  }

  const submit = async (values: TransactionFormInput) => {
    console.log(values)
    dialog.preloader("Submitting Record").open();  
    createTransaction({transcation:values,id:transcationId});
  };
 


  return (
    <>
    <form onSubmit={form.handleSubmit(submit)}>
      <List dividersIos={true} strongIos={true} strongMd={true} outlineIos={true}>
        <FormListInputField
          control={form.control}
          name="amount"
          label="Amount"
          placeholder="Enter Amount"
          valueAs="number"
        />
        <FormListInputField
          control={form.control}
          name="description"
          label="description"
          placeholder="Enter description"
        />
        {/* <FormListInputField
          control={form.control}
          name="transactionDate"
          label="transactionDate"
          placeholder="Enter Account Type"
        /> */}
         {/* <FormListInputField
            name="state"
            control={form.control}
            label="State"
            type="select"
            placeholder="Select State"
          >
            <option>Select State</option>
            {["WA","NSW"].map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
                </FormListInputField> */}
              <FormListInputField
            name="transactionDate"
            control={form.control}
            label="Transaction Date"
            type="datepicker"
            placeholder="DD-MM-YYYY"
          />
      </List>
      <Block>
      <Button fill large type="submit" disabled={isPending}>
        Submit
      </Button>
      </Block>
     { transcationId &&   <DeleteComponent accountId={transcationId}></DeleteComponent>}

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
        dialog.alert("Error saving  draft");
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