import { Block, Button } from "framework7-react";
import { useEffect, useTransition } from "react";
import { useAccount } from "../../account/hooks/getAccount";
import { List } from "@/components/ui/list";
import { FormListInputField, FormListItemCheckboxField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDialog } from "@/hooks/useDialog";
import { useDeleteAccount, useSaveAccount } from "../../account/hooks/useSaveAccount";
import { account } from "@/lib/API/appwrite/appwrite";
import { useRouter } from "@/hooks/useRouter";
import { useTrasaction } from "../hooks/useTransaction";
import { useDeleteTranscation, useSaveTransaction } from "../hooks/useSaveTransaction";
import { Category } from "@/features/category/types";
import { useCategories } from "@/features/category/hooks/UseCategory";
import { formatDate } from "@/lib/utils";


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
  isIncome: z.boolean().default(false),
  categories:z.string()
});

export type TransactionFormInput = z.infer<typeof transactionInputSchema>;

export const RecordForm = ({ transcationId: transcationId }: TransactionFormProps) => {
  const dialog = useDialog();
  const router = useRouter();
  const { data: transcationData,isLoading } = useTrasaction({
    transactionId: transcationId ,
  });
  const {data:categories} = useCategories({});
  const form = useForm<TransactionFormInput>({
    mode: "onBlur",
    resolver: zodResolver(transactionInputSchema),
  });

  const { mutate: createTransaction, isPending } = useSaveTransaction({
    mutationConfig: {
      onSuccess: () => {
        dialog.close();
        dialog.alert("Successfully saved as draft");
        router.navigate("/records/list/");
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
        transactionDate: formatDate(transcationData.transactionDate) ,
        description: transcationData.description ,
        amount: transcationData.amount || 0,
        isIncome:transcationData.isIncome,
        categories:transcationData.categories.$id
      };
      
      console.log(requestValues);
      form.reset(requestValues);
    }
  }, [transcationData, form,transcationId]);

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
        <FormListInputField
            name="categories"
            control={form.control}
            label="Category"
            type="select"
            placeholder="Select category"
          >
            <option>Select Category</option>
            {categories?.map((category:Category, index:number) => (
              <option key={index} value={category.$id}>
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
          dateFormat: { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' },
        }}
          />
            <FormListItemCheckboxField
          control={form.control}
          name="isIncome"
        >
          <div>Is Income</div>
        </FormListItemCheckboxField>
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
  const updateRequestMutation = useDeleteTranscation({
    mutationConfig: {
      onSuccess: () => {
        dialog.close();
        dialog.alert("Successfully Deleted");
        router.navigate("/records/list/");
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