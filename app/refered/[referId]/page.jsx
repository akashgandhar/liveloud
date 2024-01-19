import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { referId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    if (!referId) {
      alert("Invalid referal link");
      router.push("/");
    }
    if (localStorage.getItem("referId")) {
      alert("You have already used a referal link");
      if (!confirm("Do you want to use this link instead?")) {
        router.push("/");
      }
    } else {
      localStorage.setItem("referId", referId);
      router.push("/");
    }
  }, [referId, router]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      Redirecting...
    </div>
  );
}
