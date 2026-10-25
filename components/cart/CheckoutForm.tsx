"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { formatOrderMoney, formatOrderTime, formatPrice, formatServiceClock, parseOrderMoney, serviceTimeSlots } from "@/lib/format";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";
import { cartSubtotal, type CartLine } from "@/store/cart";

const pickupSlots = serviceTimeSlots(site.opensAt, site.closesAt);
const hoursRange = `${formatServiceClock(site.opensAt)} a ${formatServiceClock(site.closesAt)}`;

export function CheckoutForm({ items }: { items: CartLine[] }) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"Recojo en local" | "Delivery">("Recojo en local");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("");
  const [cash, setCash] = useState("");
  const [errors, setErrors] = useState<{ name?: string; time?: string; address?: string; payment?: string; cash?: string }>({});
  const subtotal = cartSubtotal(items);
  const pickup = mode === "Recojo en local";
  const cashAmount = parseOrderMoney(cash);
  const change = payment === "Efectivo" && cashAmount !== null && cashAmount >= subtotal ? cashAmount - subtotal : null;

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
    <form className="mt-6" onSubmit={submit} noValidate>
      <label className="block">
        <span className="font-medium">Nombre</span>
        <input
          className="mt-2 h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-3"
          value={name}
          autoComplete="name"
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "error-nombre" : undefined}
        />
      </label>
      {errors.name ? (
        <p id="error-nombre" className="mt-1 text-[0.9375rem] font-medium text-savia" role="alert">
          {errors.name}
        </p>
      ) : null}

      <fieldset className="mt-5">
        <legend className="font-medium">Modalidad</legend>
        <label className="mt-2 flex min-h-11 items-center gap-3">
          <input
            type="radio"
            name="modalidad"
            checked={mode === "Recojo en local"}
            onChange={() => setMode("Recojo en local")}
          />
          Recojo en local
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <input type="radio" name="modalidad" checked={mode === "Delivery"} onChange={() => setMode("Delivery")} />
          Delivery
        </label>
      </fieldset>

      <label className="mt-4 block">
        <span className="font-medium">{pickup ? "Hora de recojo" : "Hora de entrega"}</span>
        <select
          className="mt-2 h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-3"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          aria-invalid={errors.time ? true : undefined}
          aria-describedby={errors.time ? "hora-rango error-hora" : "hora-rango"}
        >
          <option value="">Elige una hora</option>
          {pickupSlots.map((slot) => (
            <option key={slot} value={slot}>
              {formatOrderTime(slot)}
            </option>
          ))}
        </select>
        <p id="hora-rango" className="mt-2 text-[0.9375rem]">
          El local atiende de {hoursRange}
        </p>
      </label>
      {errors.time ? (
        <p id="error-hora" className="mt-1 text-[0.9375rem] font-medium text-savia" role="alert">
          {errors.time}
        </p>
      ) : null}

      {mode === "Delivery" ? (
        <>
          <label className="mt-4 block">
            <span className="font-medium">Dirección</span>
            <input
              className="mt-2 h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-3"
              value={address}
              autoComplete="street-address"
              onChange={(event) => setAddress(event.target.value)}
              aria-invalid={errors.address ? true : undefined}
              aria-describedby={errors.address ? "error-direccion" : undefined}
            />
          </label>
          {errors.address ? (
            <p id="error-direccion" className="mt-1 text-[0.9375rem] font-medium text-savia" role="alert">
              {errors.address}
            </p>
          ) : null}
          <label className="mt-4 block">
            <span className="font-medium">Referencia</span>
            <input
              className="mt-2 h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-3"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
            />
          </label>
        </>
      ) : null}

      <fieldset className="mt-5" aria-describedby={errors.payment ? "error-pago" : undefined}>
        <legend className="font-medium">Método de pago</legend>
        {site.payments.map((method) => (
          <label key={method} className="mt-2 flex min-h-11 items-center gap-3">
            <input
              type="radio"
              name="pago"
              checked={payment === method}
              onChange={() => setPayment(method)}
            />
            {method}
          </label>
        ))}
      </fieldset>
      {errors.payment ? (
        <p id="error-pago" className="mt-1 text-[0.9375rem] font-medium text-savia" role="alert">
          {errors.payment}
        </p>
      ) : null}

      {payment === "Efectivo" ? (
        <label className="mt-4 block">
          <span className="font-medium">¿Con cuánto pagas?</span>
          <input
            className="mt-2 h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-3"
            inputMode="decimal"
            value={cash}
            placeholder="50"
            onChange={(event) => setCash(event.target.value)}
            aria-invalid={errors.cash ? true : undefined}
            aria-describedby={errors.cash ? "efectivo-ayuda error-efectivo" : "efectivo-ayuda"}
          />
          <p id="efectivo-ayuda" className="mt-2 text-[0.9375rem]">
            {pickup
              ? `Para preparar el vuelto. El pedido es ${formatPrice(subtotal)}.`
              : `Para preparar el vuelto. El pedido es ${formatPrice(subtotal)} y el envío se confirma después.`}
          </p>
          {pickup && change !== null ? (
            <p className="mt-1 text-[0.9375rem] font-medium">Vuelto: {formatOrderMoney(change)}</p>
          ) : null}
        </label>
      ) : null}
      {errors.cash ? (
        <p id="error-efectivo" className="mt-1 text-[0.9375rem] font-medium text-savia" role="alert">
          {errors.cash}
        </p>
      ) : null}

      <label className="mt-4 block">
        <span className="font-medium">Notas generales</span>
        <textarea
          className="mt-2 min-h-24 w-full rounded-[10px] border border-tinta/20 bg-white px-3 py-2"
          value={notes}
          maxLength={240}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>

      {pickup ? null : <p className="mt-4 text-[0.9375rem]">El costo de envío se confirma por WhatsApp.</p>}
      <button type="submit" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-hoja px-5 font-medium text-white">
        Enviar pedido por WhatsApp
      </button>
    </form>
  );
}
