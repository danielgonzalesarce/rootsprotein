"use client";

import { useState, type FormEvent } from "react";
import { PaymentGlyph } from "@/components/icons/PaymentGlyphs";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  formatOrderMoney,
  formatOrderTime,
  formatPrice,
  formatServiceClock,
  parseOrderMoney,
  serviceTimeSlots,
} from "@/lib/format";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";
import { cartSubtotal, type CartLine } from "@/store/cart";

const pickupSlots = serviceTimeSlots(site.opensAt, site.closesAt);
const hoursRange = `${formatServiceClock(site.opensAt)} a ${formatServiceClock(site.closesAt)}`;

const field =
  "mt-1.5 h-11 w-full rounded-full border-0 bg-white px-4 outline-none ring-1 ring-savia/10 transition placeholder:text-tinta/35 focus:ring-hoja/35";

export function CheckoutForm({ items }: { items: CartLine[] }) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"Recojo en local" | "Delivery">("Recojo en local");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("");
  const [cash, setCash] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    time?: string;
    address?: string;
    payment?: string;
    cash?: string;
  }>({});
  const subtotal = cartSubtotal(items);
  const pickup = mode === "Recojo en local";
  const cashAmount = parseOrderMoney(cash);
  const change =
    payment === "Efectivo" && cashAmount !== null && cashAmount >= subtotal ? cashAmount - subtotal : null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: { name?: string; time?: string; address?: string; payment?: string; cash?: string } = {};
    if (name.trim().length === 0) next.name = "Escribe tu nombre.";
    if (!pickupSlots.includes(time)) {
      next.time = pickup
        ? `Elige una hora de recojo de ${hoursRange}`
        : `Elige una hora de entrega de ${hoursRange}`;
    }
    if (!pickup && address.trim().length === 0) next.address = "Escribe la dirección de entrega.";
    if (!site.payments.includes(payment)) next.payment = "Elige cómo vas a pagar.";
    if (payment === "Efectivo") {
      const amount = parseOrderMoney(cash);
      if (amount === null) next.cash = "Escribe con cuánto pagas.";
      else if (amount < subtotal) next.cash = `El monto debe cubrir ${formatPrice(subtotal)}.`;
    }
    setErrors(next);
    if (next.name || next.time || next.address || next.payment || next.cash) return;

    const message = buildOrderMessage({
      code: String(Date.now() % 10000).padStart(4, "0"),
      lines: items.map((line) => ({
        quantity: line.quantity,
        name: line.name,
        variantLabel: line.variantLabel,
        unitPrice: line.unitPrice,
        addonOption: line.addonOption,
        addonPrice: line.addonPrice,
        note: line.note,
      })),
      subtotal,
      mode,
      name: name.trim(),
      timeLabel: formatOrderTime(time),
      address: address.trim(),
      reference: reference.trim(),
      notes: notes.trim(),
      payment,
      cashAmount: payment === "Efectivo" ? cashAmount : null,
    });
    track("send_order", { value: subtotal });
    window.open(orderWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form className="flex min-h-0 flex-1 flex-col" onSubmit={submit} noValidate>
      <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4 pt-1">
        <label className="block">
          <span className="text-sm font-medium text-savia">Nombre</span>
          <input
            className={field}
            value={name}
            autoComplete="name"
            placeholder="Tu nombre"
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "error-nombre" : undefined}
          />
        </label>
        {errors.name ? (
          <p id="error-nombre" className="-mt-2 text-sm font-medium text-hoja" role="alert">
            {errors.name}
          </p>
        ) : null}

        <fieldset>
          <legend className="text-sm font-medium text-savia">Modalidad</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(
              [
                ["Recojo en local", "Recojo"],
                ["Delivery", "Delivery"],
              ] as const
            ).map(([value, label]) => {
              const selected = mode === value;
              return (
                <label
                  key={value}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm transition",
                    selected
                      ? "bg-savia text-avena"
                      : "bg-white text-savia ring-1 ring-savia/10 hover:ring-savia/25",
                  )}
                >
                  <input
                    type="radio"
                    name="modalidad"
                    className="sr-only"
                    checked={selected}
                    onChange={() => setMode(value)}
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-medium text-savia">{pickup ? "Hora de recojo" : "Hora de entrega"}</span>
          <select
            className={field}
            value={time}
            onChange={(event) => setTime(event.target.value)}
            aria-invalid={errors.time ? true : undefined}
            aria-describedby={errors.time ? "hora-rango error-hora" : "hora-rango"}
          >
            <option value="">Elige una hora · {hoursRange}</option>
            {pickupSlots.map((slot) => (
              <option key={slot} value={slot}>
                {formatOrderTime(slot)}
              </option>
            ))}
          </select>
          <span id="hora-rango" className="sr-only">
            El local atiende de {hoursRange}
          </span>
        </label>
        {errors.time ? (
          <p id="error-hora" className="-mt-2 text-sm font-medium text-hoja" role="alert">
            {errors.time}
          </p>
        ) : null}

        {mode === "Delivery" ? (
          <div className="space-y-3 rounded-[1.1rem] bg-white p-3 ring-1 ring-savia/10">
            <label className="block">
              <span className="text-sm font-medium text-savia">Dirección</span>
              <input
                className={field}
                value={address}
                autoComplete="street-address"
                placeholder="Calle y número"
                onChange={(event) => setAddress(event.target.value)}
                aria-invalid={errors.address ? true : undefined}
                aria-describedby={errors.address ? "error-direccion" : undefined}
              />
            </label>
            {errors.address ? (
              <p id="error-direccion" className="text-sm font-medium text-hoja" role="alert">
                {errors.address}
              </p>
            ) : null}
            <label className="block">
              <span className="text-sm font-medium text-savia">Referencia</span>
              <input
                className={field}
                value={reference}
                placeholder="Opcional"
                onChange={(event) => setReference(event.target.value)}
              />
            </label>
            <p className="text-xs text-tinta/50">El costo de envío se confirma por WhatsApp.</p>
          </div>
        ) : null}

        <fieldset aria-describedby={errors.payment ? "error-pago" : undefined}>
          <legend className="text-sm font-medium text-savia">Pago</legend>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {site.payments.map((method) => {
              const selected = payment === method;
              return (
                <label
                  key={method}
                  className={cn(
                    "flex min-h-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-[1rem] px-2 py-2 text-xs transition sm:text-sm",
                    selected
                      ? "bg-savia text-avena"
                      : "bg-white text-savia ring-1 ring-savia/10 hover:ring-savia/25",
                  )}
                >
                  <input
                    type="radio"
                    name="pago"
                    className="sr-only"
                    checked={selected}
                    onChange={() => setPayment(method)}
                  />
                  <PaymentGlyph method={method} className="h-5 w-5" />
                  {method}
                </label>
              );
            })}
          </div>
        </fieldset>
        {errors.payment ? (
          <p id="error-pago" className="-mt-2 text-sm font-medium text-hoja" role="alert">
            {errors.payment}
          </p>
        ) : null}

        {payment === "Efectivo" ? (
          <label className="block">
            <span className="text-sm font-medium text-savia">¿Con cuánto pagas?</span>
            <input
              className={field}
              inputMode="decimal"
              value={cash}
              placeholder={`Pedido ${formatPrice(subtotal)}`}
              onChange={(event) => setCash(event.target.value)}
              aria-invalid={errors.cash ? true : undefined}
              aria-describedby={errors.cash ? "error-efectivo" : undefined}
            />
            {pickup && change !== null ? (
              <p className="mt-1.5 text-sm font-medium text-savia">Vuelto: {formatOrderMoney(change)}</p>
            ) : null}
          </label>
        ) : null}
        {errors.cash ? (
          <p id="error-efectivo" className="-mt-2 text-sm font-medium text-hoja" role="alert">
            {errors.cash}
          </p>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-savia">
            Notas <span className="font-normal text-tinta/40">(opcional)</span>
          </span>
          <textarea
            className="mt-1.5 min-h-16 w-full resize-none rounded-[1.1rem] border-0 bg-white px-4 py-2.5 outline-none ring-1 ring-savia/10 transition placeholder:text-tinta/35 focus:ring-hoja/35"
            value={notes}
            maxLength={240}
            placeholder="Alergias, indicaciones…"
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
      </div>

      <div className="shrink-0 border-t border-savia/10 bg-avena/95 px-5 py-4 backdrop-blur-sm">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-hoja px-5 text-base font-medium text-white transition hover:bg-savia"
        >
          <WhatsAppGlyph className="h-5 w-5" />
          Enviar pedido
          <span className="nums opacity-90">· {formatPrice(subtotal)}</span>
        </button>
      </div>
    </form>
  );
}
