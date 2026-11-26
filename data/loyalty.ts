export const loyalty = {
  name: "Raíces Roots",
  stampsNeeded: 8,
  stampCooldownHours: 4,
  qrTtlMinutes: 15,
  prizeLabel: "1 frappé o 1 bebida caliente / té",
  timezone: "America/Lima",
  cookieName: "roots_raices",
  sessionDays: 30,
} as const;

export type LoyaltyCustomer = {
  id: string;
  phone: string;
  name: string;
  pinHash: string;
  createdAt: string;
};

export type LoyaltyStamp = {
  id: string;
  customerId: string;
  createdAt: string;
  source: "qr";
};

export type LoyaltyRedemption = {
  id: string;
  customerId: string;
  stampsUsed: number;
  createdAt: string;
};

export type LoyaltyHistoryItem = {
  id: string;
  kind: "stamp" | "redeem";
  createdAt: string;
  label: string;
};
