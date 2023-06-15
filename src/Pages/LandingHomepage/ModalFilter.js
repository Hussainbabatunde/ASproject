import { createPortal } from "react-dom";
import "./ModalFilter.css";

export function Portal({ children, getModal }) {
	const DOM_Element = document.body;

	/**
	 * Checks if the click event occurred inside a specific box element.
	 * If not, it closes a modal.
	 *
	 * @param {Object} event - The click event object.
	 */
	const checker = (event) => {
		// Get the bounding rectangle of the box element
		const box = event.target.getBoundingClientRect();

		// If the click event occurred outside the box element, close the modal
		if (
			box.left > event.clientX ||
			box.right < event.clientX ||
			box.top > event.clientY ||
			box.bottom < event.clientY
		) {
			// Close the modal
			getModal.current.close();
		}
	};

	return createPortal(
		<dialog
			onClick={checker}
			className="modalfilter"
			ref={getModal}
			style={{
				fontFamily: "sans-serif",
			}}>
			<div>{children}</div>
		</dialog>,
		DOM_Element
	);
}