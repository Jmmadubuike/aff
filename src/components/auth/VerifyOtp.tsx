import { useSearchParams } from "next/navigation";

export default function VerifyOtp() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    // ...
}
