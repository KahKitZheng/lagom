import React, { useState } from "react";
import Modal from "./Modal";
import { supabase } from "../supabase/supabaseClient";
import CloseIcon from "../assets/icons/solid/CloseIcon";

type AuthModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const AuthModal = (props: AuthModalProps) => {
  const { isModalOpen, closeModal } = props;

  const [authType, setAuthType] = useState<"signUp" | "signIn">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpWithEmail() {
    await supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  async function signInWithEmail() {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  function renderUndertitle() {
    return authType === "signUp" ? (
      <p className="text-sm font-medium text-neutral-500">
        Already have an account?{" "}
        <button
          className="font-semibold text-violet-600"
          onClick={() => setAuthType("signIn")}
        >
          Sign in
        </button>{" "}
        to acces your bookmarks.
      </p>
    ) : (
      <p className="text-sm font-medium text-neutral-500">
        New here?{" "}
        <button
          className="font-semibold text-violet-600"
          onClick={() => setAuthType("signUp")}
        >
          Sign up
        </button>{" "}
        to start keeping tracks of new words.
      </p>
    );
  }

  function handleCloseModal() {
    closeModal();
    setEmail("");
    setPassword("");
  }

  return (
    <Modal
      // title={authType === "signIn" ? "Hey 👋" : "Create a new account"}
      isOpen={isModalOpen}
      closeModal={handleCloseModal}
    >
      <header>
        <div className="flex justify-between gap-8">
          <h3 className="mb-1 mr-8 text-xl font-semibold leading-6 text-neutral-700 md:text-2xl">
            {authType === "signIn"
              ? "Hey, welcome back 👋"
              : "Create a new account"}
          </h3>
          <button
            onClick={closeModal}
            className="text-xl text-neutral-600 hover:text-neutral-400"
          >
            <CloseIcon />
          </button>
        </div>
        {renderUndertitle()}
      </header>

      <hr className="my-4" />

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="Email"
              className="text-sm font-semibold text-neutral-700"
            >
              Email
            </label>
            <input
              type="email"
              className="rounded border border-neutral-200 px-4 py-2 text-sm text-neutral-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Password"
              className="text-sm font-semibold text-neutral-700"
            >
              Password
            </label>
            <input
              type="password"
              className="rounded border border-neutral-200 px-4 py-2 text-sm text-neutral-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <hr className="my-4" />

        <button
          className="w-full rounded bg-neutral-700 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-900"
          onClick={() => {
            authType === "signIn"
              ? signInWithEmail().then(() => handleCloseModal())
              : signUpWithEmail().then(() => handleCloseModal());
          }}
        >
          {authType === "signIn" ? "Sign in" : "Sign up"}
        </button>
      </form>
    </Modal>
  );
};

export default AuthModal;
