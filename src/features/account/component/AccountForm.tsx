import { Block } from "framework7-react";
import { useEffect } from "react";
import { useAccount } from "../hooks/getAccount";
import { List } from "@/components/ui/list";
import { FormListInputField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type AccountFormProps = {
  accountId?: string;
};

export const accountInputSchema = z.object({
  accountType: z.string().optional(),
  initialBalance: z.number().optional(),
  accountName: z.string().min(1, "Account Name is required"),
});

type AccountFormInput = z.infer<typeof accountInputSchema>;

export const AccountForm = ({ accountId }: AccountFormProps) => {
  const { data: account, isLoading } = useAccount({
    accountId: accountId || "0",
  });

  const form = useForm<AccountFormInput>({
    mode: "onBlur",
    resolver: zodResolver(accountInputSchema),
  });

  useEffect(() => {
    if (account) {
      // Ensure account data matches the schema
      const requestValues: AccountFormInput = {
        accountName: account[0].accountName || "test",
        accountType: account[0].accountType || "test",
        initialBalance: account[0].initialBalance
          ,
      };
      console.log(requestValues);
      form.reset(requestValues);
    }
  }, [account, form]);

  if (isLoading) {
    return <Block>Loading...</Block>;
  }

  return (
    <Block>
      <List dividersIos={false}>
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
          placeholder="Enter Amount"
          type="number" // Ensure this is of type number
        />
        <FormListInputField
          control={form.control}
          name="accountType"
          label="Account Type"
          placeholder="Enter Account Type"
        />
      </List>
    </Block>
  );
};
