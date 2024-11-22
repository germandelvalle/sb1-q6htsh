export default function ContentWrapperLayout({ title, children }) {
    return (
      <div className="border-solid rounded border-gray-300 border-2">
        {/* Título personalizable */}
        <div className="bg-gray-100 px-4 py-3 border-solid border-gray-300 border-b-2">
          {title}
        </div>
        {/* Contenido */}
        <div className="px-4 my-6">{children}</div>
      </div>
    );
  }