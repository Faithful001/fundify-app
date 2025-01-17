export type Campaign = {
  id: string;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: number;
  image: string;
  donators: Donator[];
};

export type Donator = {
  donator: string;
  amount: number;
};
