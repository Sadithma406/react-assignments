import { useState } from 'react'
import './Assignment_1.css'

const items=["The ocean is a vast, interconnected body of saltwater that covers approximately 71% of the Earth's surface. It acts as our planet's primary life-support system by generating over half of the world's oxygen, regulating global weather patterns, and harboring the majority of Earth's biodiversity",
"Books are portals to other worlds, offering an effortless way to travel through time, explore different perspectives, and expand your imagination. Whether you are diving into an adventurous fiction novel or a non-fiction historical account, reading is a proven way to sharpen your focus, reduce stress, and broaden your understanding of the world.",
"Energy is the fundamental capacity to do work or cause change. It exists in numerous forms, such as kinetic (motion), potential (stored), thermal, and electrical. A core principle of physics is that energy cannot be created or destroyed, but rather transforms from one type to another to power everything around us."]
function rending() {
	const [index, setIndex] = useState(0);
	return (
		<>
			<div id="ass1_buttons">
				<button onClick={() => setIndex(1)} className="btn1">Section #1</button>
				<button onClick={() => setIndex(2)} className="btn2">Section #2</button>
				<button onClick={() => setIndex(3)} className="btn3">Section #3</button>
			</div>
			<div id="ass1_para">
				<p>{items[index-1]}</p>
			</div>

		</>
	)
}

export default rending;