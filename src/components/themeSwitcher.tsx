import { FC } from "hono/jsx";
import { svgi } from "./svg";

export const ThemeSwitcher: FC = () => (
    <>
        <input type="checkbox" name="switcher" id="switcher-input" class="switcher-input" />
        
        <label class="switcher-label" for="switcher-input">
            <img alt="" src={svgi + "IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICA8cGF0aCBkPSJtMTIgMThjMy4zMTM3IDAgNi0yLjY4NjMgNi02IDAtMy4zMTM3MS0yLjY4NjMtNi02LTYtMy4zMTM3MSAwLTYgMi42ODYyOS02IDYgMCAzLjMxMzcgMi42ODYyOSA2IDYgNnoiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0yMiAxMmgxIiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KICA8cGF0aCBkPSJNMTIgMlYxIiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KICA8cGF0aCBkPSJtMTIgMjN2LTEiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0yMCAyMC0xLTEiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgogIDxwYXRoIGQ9Im0yMCA0LTEgMSIgc3R5bGU9InN0cm9rZTojZmZmIi8+CiAgPHBhdGggZD0ibTQgMjAgMS0xIiBzdHlsZT0ic3Ryb2tlOiNmZmYiLz4KICA8cGF0aCBkPSJtNCA0IDEgMSIgc3R5bGU9InN0cm9rZTojZmZmIi8+CiAgPHBhdGggZD0ibTEgMTJoMSIgc3R5bGU9InN0cm9rZTojZmZmIi8+CiA8L2c+Cjwvc3ZnPgo="} />
            <span class="switcher-toggler"></span>
            <img alt="" src={svgi + "IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPHBhdGggZD0iTTMgMTEuNTA2NkMzIDE2Ljc0OTcgNy4yNTAzNCAyMSAxMi40OTM0IDIxQzE2LjIyMDkgMjEgMTkuNDQ2NiAxOC44NTE4IDIxIDE1LjcyNTlDMTIuNDkzNCAxNS43MjU5IDguMjc0MTEgMTEuNTA2NiA4LjI3NDExIDNDNS4xNDgyMSA0LjU1MzQ0IDMgNy43NzkxNSAzIDExLjUwNjZaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0eWxlPSJzdHJva2U6I2ZmZiIvPgo8L3N2Zz4K"} />
        </label>
    </>
);