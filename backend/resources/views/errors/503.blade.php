@extends('errors.layout')

<!-- @section('code', '403') -->
@section('title', 'Maintenance')
@section('description', 'Sistem sedang dalam perawatan, silahkan coba kembali lagi dalam beberapa saat.')
@section('icon')
<img src="{{ asset('svg/errors/503.svg') }}" alt="503 - Maintenance" style="width:100%;height:100%;object-fit:contain">
@endsection
@section('blob-color', '#ffa500')
@section('code-color', '#ffa500')
@section('btn-color', '#ffa500')
@section('ring-color', '#ffa500')
@section('animation', 'shake')
@section('particle-colors', '#ffa500,#ff8c00,#ffc773,#ffd700')