export function Modal(props) {
  if (props.show) {
    return (
      <div className="fixed inset-0 bg-opacity-60 z-50 flex items-center justify-center">
        <section className=" p-2 w-1/2 md:w-3/4 lg:w-1/2 relative">
          {props.children}
          <button 
            className="close absolute top-0 right-0 p-4 text-2xl text-gray-700 hover:text-gray-900"
            type="button"
            onClick={props.onClose}
          >
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
