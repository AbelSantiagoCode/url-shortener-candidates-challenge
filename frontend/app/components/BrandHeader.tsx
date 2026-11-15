import { Link } from "react-router";

interface BrandHeaderProps {
  linkTo: string;
  linkLabel: string;
  arrow?: string;
}

export function BrandHeader({ linkTo, linkLabel, arrow = "→" }: BrandHeaderProps) {
  return <header className="site-header">
    <Link to="/" className="brand"><span className="brand-mark">↗</span>linkfold</Link>
    <Link to={linkTo} className="nav-link">{linkLabel} <span aria-hidden="true">{arrow}</span></Link>
  </header>;
}
