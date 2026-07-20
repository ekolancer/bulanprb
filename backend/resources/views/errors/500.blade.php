@extends('errors.layout')

<!-- @section('code', '403') -->
@section('title', 'Service Unavailable')
@section('description', 'Server sedang mengalami kendala, silahkan coba kembali lagi dalam beberapa saat.')
@section('icon')
<img src="{{ asset('svg/errors/500.svg') }}" alt="500 - Service Unavailable" style="width:100%;height:100%;object-fit:contain">
@endsection
@section('blob-color', '#e24b4a')
@section('code-color', '#e24b4a')
@section('btn-color', '#a32d2d')
@section('ring-color', '#e24b4a')
@section('animation', 'shake')
@section('particle-colors', '#e24b4a,#a32d2d,#f09595,#f7c1c1')