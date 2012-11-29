#pragma strict

function Start () {

}

function Update () {
	var zaxis : float = Input.GetAxis("Mouse ScrollWheel");
	this.gameObject.transform.Translate(Vector3(0,0,zaxis * 0.5));
}