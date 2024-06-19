import { Link } from 'wouter';

export default function LinkButton(prop: { href: string, label: any }) {
  return <Link role="button" type='button' style={{ width: "100%", margin: "1vw 0", textAlign: 'left' }} href={prop.href} {...prop}>
    {prop.label}
  </Link>;
}