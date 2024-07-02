export const Select = (props: {
  options: Array<{ name: string; value: string }>
  selected: string
  onSelect: (string: string) => void
}) => {
  return (
    <select
      value={props.selected}
      onChange={(event) => props.onSelect(event.target.value)}
      className="border-theme-primary-light rounded-md border px-3 py-1.5"
    >
      <option value="" disabled>
        Selecione
      </option>

      {props.options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
