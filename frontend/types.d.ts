export type Message = {
    role: "user" | "assistant";
    content: string;
}

export type Messages = Message[];

export type User = {
    name: string;
    email: string;
    id: string;
  } | null;