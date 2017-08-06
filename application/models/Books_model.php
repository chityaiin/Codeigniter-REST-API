<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Books_model extends CI_Model {

        public $name;
        public $description;
        public $date;

        public function get($id=0)
        {
          if($id==0){
            $query = $this->db->get('books');
            return $query->result();
          }else{
            $this->db->where('id',$id);
            $query = $this->db->get('books');
            return $query->row();
          }
        }

        public function save($data)
        {
            //print_r($data);
                $this->db->insert('books',$data);
        }

        public function update($id,$data)
        {
                $this->db->update('books', $data, array('id' => $id));
        }
        public function delete($id)
        {
                $this->db->delete('books', array('id' => $id));
        }
}
