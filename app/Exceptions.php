<?php
namespace App {
    class CustomException extends \Exception
    {

    }
    class NotFoundException extends CustomException
    {

    }
    class SessionHandlerException extends CustomException
    {

    }
    class SessionDisabledException extends SessionHandlerException
    {

    }
    class InvalidArgumentTypeException extends SessionHandlerException
    {

    }
    class ExpiredSessionException extends SessionHandlerException
    {

    }
    class ModelException extends CustomException
    {

    }
    class KeyMissingException extends ModelException
    {

    }



}
