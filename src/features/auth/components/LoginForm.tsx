

import { LoginInput, loginInputSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Block,
  Button,
  Link,
  ListItem,
  NavRight,
  Navbar,
  PageContent,
  Sheet,
  f7,
} from "framework7-react";
import { useForm } from "react-hook-form";
import { List } from "@/components/ui/List";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";


import { useAuth } from "../api/login";
import { Form, FormListInputField } from "@/components/ui/Form";


export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { login, loginErrorMessage } = useAuth();
  const toast = useToast();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const form = useForm<LoginInput>({
    mode: "onBlur",
    resolver: zodResolver(loginInputSchema),
  });

  const submitForm = () => {
    form
      .handleSubmit(async (values: LoginInput) => {
        const valid = await login.mutateAsync(values);
        if (valid.$id) {
          onSuccess?.();
        }
      })()
      .catch((e) => {
        console.log("error submitting form", e);
      });
  };
  return (
    <div>
      <Form {...form}>
        <List>
          <FormListInputField
            name="username"
            control={form.control}
            className="list-item-no-border"
            label="Email"
            type="text"
            placeholder="Your email"
          />
          <FormListInputField
            name="password"
            control={form.control}
            className="list-item-no-border"
            label="Password"
            type="password"
            placeholder="Your password"
          />
          {!!loginErrorMessage && (
            <ListItem>
              <span className=" text-error">{loginErrorMessage}</span>
            </ListItem>
          )}
        </List>
      </Form>
      <Block>
        <Button
          large
          fill
          onClick={submitForm}
          preloader
          loading={login.isPending}
        >
          SIGN IN
        </Button>
        <div className="text-right mt-4">
          <Link
            className="text-muted"
            onClick={() => {
              setIsForgotPasswordOpen(true);
            }}
          >
            Forgot your password?
          </Link>
        </div>
      </Block>
      <Sheet
        className="forgot-password-sheet-push"
        backdrop
        opened={isForgotPasswordOpen}
        onSheetClose={() => {
          setIsForgotPasswordOpen(false);
        }}
        style={{
          height: "90%",
        }}
      >
        <Navbar title="Forgot Password?">
          <NavRight>
            <Link sheetClose>Close</Link>
          </NavRight>
        </Navbar>
        <PageContent>
          {isForgotPasswordOpen && (
            <></>
            // <ForgotPasswordForm
            //   onSuccess={() => {
            //     setIsForgotPasswordOpen(false);
            //     toast.create({
            //       text: "Your password has been reset. Please login with your new password",
            //       closeButton: true,
            //       closeTimeout: 2000,
            //     });
            //   }}
            // />
          )}
        </PageContent>
      </Sheet>
    </div>
  );
};
