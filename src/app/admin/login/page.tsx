import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-sm space-y-6 pt-12">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tighter">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Manage the blog posts of this site.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
