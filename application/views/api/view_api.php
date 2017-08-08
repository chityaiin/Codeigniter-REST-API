<?php
function indent($json) {

    $result      = '';
    $pos         = 0;
    $strLen      = strlen($json);
    $indentStr   = '  ';
    $newLine     = "\n";
    $prevChar    = '';
    $outOfQuotes = true;

    for ($i=0; $i<=$strLen; $i++) {

        // Grab the next character in the string.
        $char = substr($json, $i, 1);

        // Are we inside a quoted string?
        if ($char == '"' && $prevChar != '\\') {
            $outOfQuotes = !$outOfQuotes;

        // If this character is the end of an element,
        // output a new line and indent the next line.
        } else if(($char == '}' || $char == ']') && $outOfQuotes) {
            $result .= $newLine;
            $pos --;
            for ($j=0; $j<$pos; $j++) {
                $result .= $indentStr;
            }
        }

        // Add the character to the result string.
        $result .= $char;

        // If the last character was the beginning of an element,
        // output a new line and indent the next line.
        if (($char == ',' || $char == '{' || $char == '[') && $outOfQuotes) {
            $result .= $newLine;
            if ($char == '{' || $char == '[') {
                $pos ++;
            }

            for ($j = 0; $j < $pos; $j++) {
                $result .= $indentStr;
            }
        }

        $prevChar = $char;
    }

    return $result;
}
 ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>API</title>

    <!-- Bootstrap core CSS -->
    <link href="<?=base_url()?>static_api/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?=base_url()?>static_api/js/codemirror.css" rel="stylesheet">
    <link href="<?=base_url()?>static_api/css/style-api.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="<?=base_url()?>static_api/js/jquery.min.js"></script>
    <script src="<?=base_url()?>static_api/js/codemirror.js"></script>
    <script src="<?=base_url()?>static_api/js/beautify.js"></script>
    <script src="<?=base_url()?>static_api/js/bootstrap.min.js"></script>
    <style>
    .CodeMirror {
      border: 1px solid #eee;
      height: auto;
    }
    .CodeMirror-scroll {
      overflow-y: hidden;
      overflow-x: auto;
    }
    </style>
  </head>

  <body>
    <div class="container">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">API</a>
          </div>

            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Chit</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                <ul class="dropdown-menu">
                      <li><a href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    </div>

    <div class="container">
      <form id=formSumit>
        <div class="panel panel-default">
          <div class="panel-heading">API</div>
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <div class="input-group">
                  <div class="input-group-btn">
                    <input type="hidden" id="method" value="get">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="title-method">GET</span> <span class="caret"></span></button>
                    <ul class="dropdown-menu" id="menu-method">
                      <li><a href="" value="get">GET</a></li>
                      <li><a href="" value="post">POST</a></li>
                      <!-- <li><a href="" value="put">PUT</a></li>
                      <li><a href="" value="delete">DELETE</a></li> -->
                    </ul>
                  </div><!-- /btn-group -->
                  <input type="text" class="form-control" aria-label="..." id="url" value="<?="http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"?>">
                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-primary" id="submit">Send</button>
                  </div>
                </div><!-- /input-group -->
              </div><!-- /.col-lg-6 -->

            </div><!-- /.row -->
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-body">
            <p>HTTP 200 OK</p>
            <p>Allow: GET, POST, HEAD, OPTIONS</p>
            <p>Content-Type: application/json</p>

          </div>
        </div>

        <div class="panel panel-default hidden" id="form" >
          <div class="panel-body">


                <?php
                  if(!empty($model))
                    foreach ($model as $key => $value) {

                ?>
                <div class="form-group">
                  <label for="<?=$key?>"><?=$key?></label>
                  <input type="text" class="form-control" disabled="disabled" id="<?=$key?>" name="<?=$key?>" placeholder="<?=$key?>">
                </div>
                <?php
              }
                 ?>

          </div>
        </div>
      </form>
    </div>





    <div class="container">
      <div class="panel panel-default">
        <div class="panel-body">
          <textarea class="form-control" id="display" style="heigth: 500px;"><?=indent(json_encode($data))?></textarea>
        </div>
      </div>
    </div>
  </body>

  <script>


  var editor = CodeMirror.fromTextArea(document.getElementById("display"), {
    matchBrackets: true,
      autoCloseBrackets: true,
      mode: "application/json",
      lineWrapping: true
  });

  $(document).ready(function(){

      $('#menu-method a').click(function(event){
          var v = $(this).attr('value');
          $('#title-method').text($(this).text());
          $('#formSumit').attr('method',v);
          if(v=='post' || v=='put'){
            $('#form').removeClass('hidden');
            $('#form input').val('');
            $('#form input').attr('disabled',false);
          }else {
            $('#form').addClass('hidden');
          }

          $('#form')
          event.preventDefault()
      });

      $('#url').keyup(function(){
        $('#formSumit').attr('action',$(this).val());
      });

      // $('#formSumit').sumit(function(){
      //
      //
      //   return v=='delete';
      // });


  });

</script>

</html>
