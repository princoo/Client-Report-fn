import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideNav() {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <FontAwesomeIcon icon="bars-staggered" />
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-13 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 ">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FontAwesomeIcon icon="file-signature" />
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FontAwesomeIcon icon="handshake" />
                <span className="flex-1 ms-3 whitespace-nowrap">Home visits</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FontAwesomeIcon icon="group-arrows-rotate" />
                <span className="flex-1 ms-3 whitespace-nowrap">Support groups</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FontAwesomeIcon icon="calendar-days" />
                <span className="flex-1 ms-3 whitespace-nowrap">Weekly plan</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
