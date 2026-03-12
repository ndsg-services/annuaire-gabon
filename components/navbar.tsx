import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid #e4e4e7", background: "white" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#18181b",
            textDecoration: "none",
          }}
        >
          Annuaire Gabon
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#52525b" }}>
            Accueil
          </Link>
          <Link
            href="/secteur/banque"
            style={{ textDecoration: "none", color: "#52525b" }}
          >
            Secteurs
          </Link>
          <Link
            href="/ville/libreville"
            style={{ textDecoration: "none", color: "#52525b" }}
          >
            Villes
          </Link>
          <Link
            href="/a-propos"
            style={{ textDecoration: "none", color: "#52525b" }}
          >
            À propos
          </Link>
        </nav>
      </div>
    </header>
  );
}