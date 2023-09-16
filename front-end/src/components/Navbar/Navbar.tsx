import { MessageIcon } from "../svg/MessageIcon"
import { PhoneIcon } from "../svg/PhoneIcon"

export const Navbar = () => {
  return (
    <aside>
      <nav>
        <ul className="h-[calc(100dvh-48px)] w-8">
          <li>
            <MessageIcon width={20} height={20}/>
          </li>
          <li>
            <PhoneIcon width={20} height={20} />
          </li>
          <li>
            
          </li>
        </ul>
      </nav>
    </aside>
  )
}