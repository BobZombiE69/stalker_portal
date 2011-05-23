<?php

class RemotePvr extends AjaxResponse
{
    public function __construct(){
        parent::__construct();
    }

    public function createLink(){
        
        preg_match("/\/media\/(\d+).mpg$/", $_REQUEST['cmd'], $tmp_arr);

        $media_id = $tmp_arr[1];

        $master = new StreamRecorder();

        try {
            $res = $master->play($media_id, 0, false);
        }catch (Exception $e){
            trigger_error($e->getMessage());
        }

        var_dump($res);

        return $res;
    }

    public function getOrderedList(){

        $result = $this->db
                        ->select('users_rec.*, itv.name as ch_name, UNIX_TIMESTAMP(t_start) as t_start_ts')
                        ->from('users_rec')
                        ->join('itv', 'itv.id', 'users_rec.ch_id', 'LEFT')
                        ->where(array('uid' => $this->stb->id))
                        ->orderby('t_start', 'DESC')
                        ->orderby('t_stop', 'DESC')
                        ->limit(self::max_page_items, $this->page * self::max_page_items);

        $this->setResponseData($result);

        return $this->getResponse('prepareData');
    }

    public function prepareData(){

        for ($i = 0; $i < count($this->response['data']); $i++){

            $this->response['data'][$i]['length']  = System::convertTimeLengthToHuman($this->response['data'][$i]['length']);

            $this->response['data'][$i]['t_start'] = System::convertDatetimeToHuman($this->response['data'][$i]['t_start_ts']);

            $this->response['data'][$i]['cmd'] = 'auto /media/'.$this->response['data'][$i]['id'].'.mpg';

            $this->response['data'][$i]['ch_name'] = $this->response['data'][$i]['ch_name'];

            if (!empty($this->response['data'][$i]['program'])){
                $this->response['data'][$i]['ch_name'] .= ' — '.$this->response['data'][$i]['program'];
            }

            $this->response['data'][$i]['name'] = $this->response['data'][$i]['ch_name'];

            $this->response['data'][$i]['open'] = !$this->response['data'][$i]['ended'];

            $this->response['data'][$i]['started'] = intval($this->response['data'][$i]['started']);
            $this->response['data'][$i]['ended']   = intval($this->response['data'][$i]['ended']);

            if ($this->response['data'][$i]['started'] && !$this->response['data'][$i]['ended']){
                $this->response['data'][$i]['length'] = _('recording');
            }elseif (!$this->response['data'][$i]['started'] && !$this->response['data'][$i]['ended']){
                $this->response['data'][$i]['length'] = _('scheduled');
            }
        }

        return $this->response;
    }

    public function startRecDeferred(){

        $program_id = intval($_REQUEST['program_id']);

        //$channel = Mysql::getInstance()->from('itv')->where(array('id' => $ch_id))->get()->first();

        /*if (empty($channel)){
            return false;
        }*/

        $recorder = new StreamRecorder();

        return $recorder->startDeferred($program_id);
        //if ($recorder->startDeferred($program_id)){
            //return $this->getRecordingChIds();
        //    return true;
        //}
    }

    public function stopRecDeferred(){

        $rec_id   = intval($_REQUEST['rec_id']);
        $duration = intval($_REQUEST['duration']);

        $recorder = new StreamRecorder();

        return $recorder->stopDeferred($rec_id, $duration);
    }

    public function startRecNow(){

        $ch_id = intval($_REQUEST['ch_id']);

        $channel = Mysql::getInstance()->from('itv')->where(array('id' => $ch_id))->get()->first();

        if (empty($channel)){
            return false;
        }

        $recorder = new StreamRecorder();

        if ($recorder->startNow($channel)){
            return $this->getRecordingChIds();
        }
    }

    public function stopRec(){

        $rec_id = intval($_REQUEST['rec_id']);

        $recorder = new StreamRecorder();

        return $recorder->stop($rec_id);
    }

    public function getRecordingChIds(){

        return Mysql::getInstance()->select('id, ch_id, UNIX_TIMESTAMP(t_start) as t_start_ts')->from('users_rec')->where(array('uid' => $this->stb->id, 'ended' => 0, 'started' => 1))->get()->all();
    }

    public function delRec(){

        $rec_id = intval($_REQUEST['rec_id']);

        $recorder = new StreamRecorder();

        return $recorder->del($rec_id);
    }
}

?>