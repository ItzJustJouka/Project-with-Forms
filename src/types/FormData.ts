export default interface FormData {
    name: string;
    surname: string;
    email: string;
    birthday: Date;
    role: "JD" | "SD" | "Director";
    hasAgreed: boolean;
}