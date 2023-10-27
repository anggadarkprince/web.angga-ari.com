import Link from "next/link";
import styles from '../page.module.css';
import {clsx} from "clsx";
import {Input, InputGroup} from "@/app/components/Form/Input";
import {Button, ButtonLink} from "@/app/components/Form/Button";
import Image from "next/image";
import {RegisterForm} from "@/app/(manage)/(auth)/register/components/RegisterForm";

export default async function Login() {
  return (
    <main className={clsx('main', styles.auth__main)}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__titleWrapper}>
          <img src="../assets/img/favicon.png" alt="Logo" className={styles.auth__logo}/>
          <div>
            <h1 className={styles.auth__title}>Sign Up</h1>
            <h3 className={styles.auth__subtitle}>Register your account right now</h3>
          </div>
        </div>

        <RegisterForm />

        <p className={clsx('mb-1 mt-1', styles.separator__or)}>OR</p>

        <InputGroup className={'grid gap-1 col-lg-2 mb-1'}>
          <ButtonLink href={'#'} className={clsx('width-full', styles.button__social)}>
            <Image src="/assets/img/google.png" alt="Google" width={20} height={20}/>Google
          </ButtonLink>
          <ButtonLink href={'#'} className={clsx('width-full', styles.button__social)}>
            <Image src="/assets/img/github.png" alt="Github" width={20} height={20}/>Github
          </ButtonLink>
        </InputGroup>
        <p className="text-center">Already have an account? <Link href="/login">Sign In</Link></p>
        <p className="text-center text-fade mt-2">&copy; 2023 All Rights Reserved.</p>
      </div>
    </main>
  )
}
