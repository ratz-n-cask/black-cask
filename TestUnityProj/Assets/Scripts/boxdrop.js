
function OnCollisionEnter(C : Collision) {
	if (C.gameObject.name == "Wall") {
		Debug.Log("Collision with wall detected.");
	}
}