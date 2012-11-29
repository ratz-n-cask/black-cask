#pragma strict
var speed : float = 5.0;
function Start () {

}

function Update () {

	transform.Translate(Vector3(0,0,5) * Time.deltaTime);

}