<?php

namespace App\Http\Controllers;

use App\Models\Dato;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class DatoController extends Controller
{
    //
    public function store($temperatura): JsonResponse
    {
        if (empty($temperatura) || !is_numeric($temperatura)) {
            return response()->json(['error' => 'Dato inválido'], 400);
        }        
        try {
            $response = Http::withOptions(['verify' => false])->get('https://www.meteosource.com/api/v1/free/point?place_id=Cuautla&sections=current%2Chourly&language=en&units=auto&key=9dkrm53echts9s1z0onlibpa1indkesm21ucuvi9');

            if ($response->failed() || !isset($response->json()['current']['temperature'])) {
                return response()->json(['error' => 'Datos no disponibles o estructura incorrecta'], 500);
            }

            Dato::create([
                "temperatura_api" => $response->json()['current']['temperature'],
                "temperatura_sensor" => $temperatura
            ]);

            return response()->json(['success' => 'Dato guardado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un problema con el servidor: ' . $e->getMessage()], 500);
        }
    }

    public function getLast(): JsonResponse
    {
        $temperatura = Dato::latest()->first();
        return response()->json([$temperatura]);
    }
}
