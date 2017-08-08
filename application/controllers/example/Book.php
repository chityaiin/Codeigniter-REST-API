<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Book extends API_Controller {

	function __construct() {
			parent::__construct();

			// load Model
			$this->load->model('Books_model','books');

	}

	public function get()
	{
		$id = $this->get_id();


			$data = $this->books->get($id);

			if($data)
				$this->respont($data,$this->books);

			else {
				$this->respont(array(
					'status' => FALSE,
					'error' => 'No users were found'
				));
			}
	}

	public function post(){

		$data = $this->get_post();
		$this->books->save($data);
		$this->respont($data);
	}

	public function put(){
		$id = $this->get_id();
		$data = $this->get_put();
		$this->books->update($id,$data);
		$this->respont($data);
	}

	public function delete(){

		$id = $this->get_id();
		$this->books->delete($id);
		$this->respont(array(
			'status' => true
		));
	}


}
