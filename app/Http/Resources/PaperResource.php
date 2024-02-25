<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaperResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'abstract' => $this->abstract,
            'file' => $this->file,
        ];
    
        // Check if $this->date is a string and convert it to DateTime object if necessary
        if ($this->date && is_string($this->date)) {
            $data['date'] = \DateTime::createFromFormat('Y-m-d', $this->date)->format('Y-m-d');
        } else {
            $data['date'] = $this->date ? $this->date->format('Y-m-d') : null;
        }
    
        // Check if $this->created_at is a string and convert it to DateTime object if necessary
        if ($this->created_at && is_string($this->created_at)) {
            $data['created_at'] = \DateTime::createFromFormat('Y-m-d H:i:s', $this->created_at)->format('Y-m-d H:i:s');
        } else {
            $data['created_at'] = $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null;
        }
    
        return $data;
    }
    
}
