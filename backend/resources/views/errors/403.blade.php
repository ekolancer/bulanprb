@extends('errors.layout')

<!-- @section('code', '403') -->
@section('title', 'Akses ditolak')
@section('description', 'Kamu tidak memiliki izin untuk mengakses halaman ini. Jika ini terasa keliru, hubungi administrator sistem.')
@section('icon')
<img src="{{ asset('svg/errors/403.svg') }}" alt="403 - Akses ditolak" style="width:100%;height:100%;object-fit:contain">
@endsection
@section('blob-color', '#e24b4a')
@section('code-color', '#e24b4a')
@section('btn-color', '#a32d2d')
@section('ring-color', '#e24b4a')
@section('animation', 'shake')
@section('particle-colors', '#e24b4a,#a32d2d,#f09595,#f7c1c1')
