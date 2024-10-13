import { Block, Button, Link, ListItem } from "framework7-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { List } from "@/components/ui/list";
import { zodAlwaysRefine } from "@/lib/utils";
import { signupInputSchema } from "@/types/auth";
import { useSignup } from "../hooks/useSignup";
import { Form, FormListInputField, FormListItemCheckboxField } from "@/components/ui/form";


const signupFormSchema = zodAlwaysRefine(
  signupInputSchema.extend({
    confirm_email: z.string().email("Invalid email"),
    confirm_password: z.string(),
    terms_and_conditions: z
      .boolean()
      .optional()
      .refine((bool) => bool === true, {
        message:
          "Please read and accept our Privacy Policy and Terms and conditions",
      }),
  }),
).superRefine((data, ctx) => {
  if (data.email !== data.confirm_email) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Email address does not match",
      path: ["confirm_email"],
    });
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password  does not match",
        path: ["confirm_password"],
      });
  }}
});
type SignupFormInput = z.infer<typeof signupFormSchema>;


export const SignupForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<SignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signupFormSchema),
  });

  const { mutate: signup, isPending, isError, isSuccess, error } = useSignup({
    mutationConfig: {
      onSuccess: (data) => {
        // Handle successful signup (e.g., redirect, show a success message)
        console.log('Signup successful:', data);
      },
      onError: (error) => {
        // Handle signup error
        console.error('Signup failed:', error);
      },
    },
  });

  const submitForm = () => {
    form
      .handleSubmit(async (values: SignupFormInput) => {
        try {
          await signup({ data: values });
        } catch (e) {
          console.log("error submitting form", e);
        }
      })();
  };

  return (
    <div>
      <Form {...form}>
        <List>
          <FormListInputField
            name="firstname"
            control={form.control}
            label="Given Name"
            type="text"
            placeholder="Enter Given Name"
          />
          <FormListInputField
            name="lastName"
            control={form.control}
            label="Surname"
            type="text"
            placeholder="Enter Surname"
          />
          <FormListInputField
            name="password"
            control={form.control}
            label="Password"
            type="password"
            placeholder="Enter Password"
          />
          <FormListInputField
            name="confirm_password"
            control={form.control}
            label="Password"
            type="password"
            placeholder="Enter Password"
          />
          <FormListInputField
            name="address1"
            control={form.control}
            label="Address"
            type="text"
            placeholder="Enter your specific address"
          />
         <FormListInputField
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
                </FormListInputField>
              <FormListInputField
            name="dateOfBirth"
            control={form.control}
            label="Date of Birth"
            type="date"
            placeholder="DD-MM-YYYY"
          />
          <FormListInputField
            name="mobileNumber"
            control={form.control}
            label="Work Mobile Number"
            type="tel"
            placeholder="Enter Mobile Number"
          />
          <FormListInputField
            name="email"
            control={form.control}
            label="Email"
            type="email"
            placeholder="Enter Email Address"
          />
          <FormListInputField
            name="confirm_email"
            control={form.control}
            label="Confirm Email"
            type="email"
            placeholder="Enter Email Address"
          />
          <ListItem>
            <p>
              Click here to read{" "}
              <Link
                className="text-secondary underline"
                href="/privacy-policy/"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                className="text-secondary underline"
                href="/terms-and-conditions/"
              >
                Terms and Conditions
              </Link>
              .
            </p>
          </ListItem>
          <FormListItemCheckboxField
            name="terms_and_conditions"
            control={form.control}
            title="I have read and agree to the Privacy Policy and Terms and Conditions"
          />
        </List>
      </Form>
      <Block>
        <div className="flex flex-col gap-4">
          <Button large fill preloader onClick={submitForm} className="bg-indigo-500">
            SUBMIT
          </Button>
          <Button large fill preloader bgColor="red" href="/auth/">
            CANCEL
          </Button>
        </div>
      </Block>
    </div>
  );
};
