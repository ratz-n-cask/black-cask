#pragma strict
var power : float = 500.0;

function Start () {
	
}

function Update () {
	if (Input.GetButtonUp("Jump")) {
		rigidbody.AddForce(Vector3(0,power,0));
	}
}