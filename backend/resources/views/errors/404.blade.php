@extends('errors.layout')

<!-- @section('code', '404') -->
@section('title', 'Halaman tidak ditemukan')
@section('description', 'Halaman yang kamu cari mungkin sudah dihapus, dipindahkan, atau tidak pernah ada. Periksa kembali URL yang kamu masukkan.')

@section('icon')
<img src="{{ asset('svg/errors/404.svg') }}" alt="404 - Halaman tidak ditemukan" style="width:100%;height:100%;object-fit:contain">
@endsection

@section('blob-color', '#378add')
@section('code-color', '#378add')
@section('btn-color', '#378add')
@section('ring-color', '#378add')
@section('animation', 'bounce')
@section('particle-colors', '#378add,#185fa5,#85b7eb,#b5d4f4')