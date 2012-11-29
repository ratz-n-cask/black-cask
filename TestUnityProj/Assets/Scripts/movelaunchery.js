#pragma strict

function Start () {

}

function Update () {
	var vert : float = Input.GetAxis("Vertical");
	this.gameObject.transform.Translate(Vector3(0,vert*0.5,0));
}