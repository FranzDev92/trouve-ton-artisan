export default function Stars({value=0}){/* value 0..5 */
  const n=Math.max(0,Math.min(5,Math.round(value)));
  return <span aria-label={`${n} sur 5`}>{"★★★★★☆☆☆☆☆".slice(5-n,10-n)}</span>;
}
