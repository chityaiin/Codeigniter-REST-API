<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class API_Controller extends CI_Controller {

    private $_data;
    private $_input_id = 0;

    private $_method = null;
    private $_content_type = 'application/json';

    function __construct() {
        parent::__construct();

        $this->_method = $_SERVER['REQUEST_METHOD'];
        if(count($this->input->post())>0){
              $this->_data = $this->input->post();
        }else
        {
           // If no file type is provided, then there are probably just arguments
           if(is_array(json_decode($this->input->raw_input_stream,true)))
              $this->_data = json_decode($this->input->raw_input_stream,true);
          else{
               parse_str($this->input->raw_input_stream,$this->_data);
          }
         }
        if(!empty($_SERVER['CONTENT_TYPE']))
          $this->_content_type = $_SERVER['CONTENT_TYPE'];

    }


    protected function get_put($key = NULL)
    {
        if ($key === NULL)
        {
            return $this->_data;
        }
        return isset($this->_data[$key]) ? $this->_data[$key]:null;
    }

    protected function get_post($key = NULL)
    {
        if ($key === NULL)
        {
            return $this->_data;
        }
        return isset($this->_data[$key]) ? $this->_data[$key]:null;
    }

    public function index($id=0,$fomat = 'json') {

         $this->_input_id = $id;
        if($this->_method=='PUT')
          $this->put();
        if($this->_method=='POST')
            $this->post();
        if($this->_method=='GET')
            $this->get();
        if($this->_method=='DELETE')
            $this->delete();

    }

    protected function get_id(){
      return $this->_input_id;
    }

    protected function _set($key, $value) {
        $this->_data[$key] = $value;
    }

    protected function _unset($key) {
        unset($this->_data[$key]);
    }

    protected function _clear() {
        $this->_data = array();
    }

    protected function _get($key = NULL) {
        if ($key === NULL OR $key === TRUE OR $key === FALSE) {
            return $this->_data;
        }
        return (array_key_exists($key, $this->_data) ? $this->_data[$key] : NULL);
    }

    protected function respont($data,$model=null){

        $view = $this->input->get('format');
        $method = 'get';
        if(empty($view) && empty($_SERVER['CONTENT_TYPE']) || $_SERVER['CONTENT_TYPE'] == 'application/x-www-form-urlencoded'){
          $view = 'html';
        }else if(empty($view)){
          $view = 'json';
        }

        if(!empty($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] == 'application/x-www-form-urlencoded'){
          $method = 'post';
        }

        if($view=='json'){
          header('Content-Type: application/json');
          echo json_encode($data);
        }else if($view=='xml'){
          header('Content-Type: application/xml');
        }else{
          $this->load->view('api/view_api',array(
            'data'=> $data,
            'method' => $method,
            'model' => $model
          ));
        }

        //exit();
    }

}
