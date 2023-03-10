import { useLocation, useOutlet } from "react-router-dom"

export default function tittleLocation() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const outlet = useOutlet()
  const findComponent = outlet.props.children.props.children.type.name // render edilen component
  const filter = findComponent !== "PageNotFound" ? location.pathname : findComponent
  if (filter !== "PageNotFound") {
    let fil = filter.substring(1, filter.length).split("/").pop()
    if (fil !== "") {
      return fil[0].toLocaleUpperCase() + fil.substring(1)
    }
    return "PageNotFound"
  }
  return "PageNotFound"
}
