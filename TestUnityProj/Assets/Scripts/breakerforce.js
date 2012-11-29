#pragma strict

function Start () {
	this.gameObject.rigidbody.AddForce(Vector3(-300,0,-300));
}

function Update () {
	//if (Input.GetButtonUp("Jump")) {
	//	this.gameObject.rigidbody.AddForce(Vector3(-100,0,-100));
	//}
}