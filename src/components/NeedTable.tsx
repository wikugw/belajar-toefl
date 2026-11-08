"use client";

import { needFor } from "@/lib/score";
import { useTarget } from "@/lib/storage";

export function NeedTable() {
  const n = needFor(useTarget());
  return (
    <tbody>
      <tr>
        <td>Listening</td>
        <td className="num">{n.l} / 50</td>
        <td className="num">{n.sl}</td>
      </tr>
      <tr>
        <td>Structure</td>
        <td className="num">{n.s} / 40</td>
        <td className="num">{n.ss}</td>
      </tr>
      <tr>
        <td>Reading</td>
        <td className="num">{n.r} / 50</td>
        <td className="num">{n.sr}</td>
      </tr>
      <tr className="hl">
        <td>
          <b>Total</b>
        </td>
        <td className="num">{n.l + n.s + n.r} / 140</td>
        <td className="num">
          <b>
            ({n.sl}+{n.ss}+{n.sr})×10÷3 ≈ {n.total}
          </b>
        </td>
      </tr>
    </tbody>
  );
}
