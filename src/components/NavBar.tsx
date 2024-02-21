import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar() {
  return (
    <div>
      <div className="flex bg-gray-100 w-full justify-between p-4 border-b-2">
        <p className="font-medium text-lg">CATS CARE</p>
        <div className="flex px-2 gap-5 text-lg">
          <FontAwesomeIcon icon="bell" />
          <FontAwesomeIcon icon="user" />
        </div>
      </div>
    </div>
  );
}
