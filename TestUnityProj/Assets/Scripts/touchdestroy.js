#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(C: Collision) {
	Debug.Log("Collision Entered");
	Debug.Log(C.collider.name);
	if (C.collider.name == "Breaker(Clone)") {
		Destroy(this.gameObject);
		Debug.Log("Broken");
	}
}