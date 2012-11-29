#pragma strict

function Start () {

}

function Update () {
	var horiz : float = Input.GetAxis("Horizontal");
	var zaxis : float = Input.GetAxis("Mouse ScrollWheel");
	var vert : float = Input.GetAxis("Vertical");
	this.gameObject.transform.Translate(Vector3(horiz*0.5,vert*0.5,zaxis*0.5));
}