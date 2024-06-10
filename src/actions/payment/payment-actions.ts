import { v4 as uuidv4 } from "uuid";

export const paymentFootprint = (footprint_query: string) => {
  const payment_footprint = uuidv4()
  return payment_footprint
}

